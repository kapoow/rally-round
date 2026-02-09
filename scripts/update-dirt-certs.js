#!/usr/bin/env node

const tls = require('tls');
const fs = require('fs');
const path = require('path');

const host = 'dirtrally2.dirtgame.com';
const port = 443;

console.log(`Fetching SSL certificates from ${host}...`);

const options = {
  host: host,
  port: port,
  rejectUnauthorized: false, // We need this to get the certs even if they're "invalid"
  servername: host
};

const socket = tls.connect(options, () => {
  console.log('✓ Connected to server');

  // Get full certificate chain
  const peerCert = socket.getPeerCertificate(true);

  if (!peerCert || !peerCert.raw) {
    console.error('✗ Could not retrieve certificate');
    socket.end();
    process.exit(1);
  }

  const certDir = path.join(__dirname, '../src/api/dirt');

  // Helper to convert DER to PEM
  const derToPem = (der, type = 'CERTIFICATE') => {
    const base64 = der.toString('base64');
    const lines = base64.match(/.{1,64}/g) || [];
    return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----\n`;
  };

  // Collect all certificates in the chain
  const certChain = [];
  let current = peerCert;

  // Walk the entire chain
  while (current) {
    certChain.push(current);
    if (current.issuerCertificate && current !== current.issuerCertificate) {
      current = current.issuerCertificate;
    } else {
      break;
    }
  }

  console.log(`✓ Found ${certChain.length} certificate(s) in chain\n`);

  const savedCerts = [];

  certChain.forEach((cert, index) => {
    const subject = cert.subject.CN || cert.subject.O || 'Unknown';
    const issuer = cert.issuer.CN || cert.issuer.O || 'Unknown';

    let certName;

    // Determine filename based on certificate type
    if (index === 0) {
      // Server certificate
      certName = '_.dirtgame.pem';
      console.log(`[${index + 1}/${certChain.length}] Server Certificate`);
    } else if (subject.includes('USERTrust') || issuer === subject) {
      // Root CA
      certName = 'Builtin Object Token_USERTrust RSA Certification Authority.pem';
      console.log(`[${index + 1}/${certChain.length}] Root CA`);
    } else if (subject.includes('Sectigo')) {
      // Intermediate CA
      certName = 'Sectigo RSA Organization Validation Secure Server CA.pem';
      console.log(`[${index + 1}/${certChain.length}] Intermediate CA`);
    } else {
      // Unknown intermediate
      certName = `intermediate-${index}.pem`;
      console.log(`[${index + 1}/${certChain.length}] Intermediate Certificate`);
    }

    const certPem = derToPem(cert.raw);
    const certPath = path.join(certDir, certName);

    fs.writeFileSync(certPath, certPem);
    savedCerts.push(certName);

    console.log(`  Subject: ${subject}`);
    console.log(`  Issuer:  ${issuer}`);
    console.log(`  Saved:   ${certPath}\n`);
  });

  console.log('✅ All certificates updated successfully!');
  console.log('\nSaved files:');
  savedCerts.forEach(name => console.log(`  - ${name}`));

  socket.end();
});

socket.on('error', (err) => {
  console.error('✗ Error connecting to server:', err.message);
  process.exit(1);
});
