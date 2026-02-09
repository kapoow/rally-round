#!/bin/bash

HOST="dirtrally2.dirtgame.com"
PORT=443
CERT_DIR="src/api/dirt"

echo "Fetching SSL certificate chain from ${HOST}:${PORT}..."
echo ""

# Get the certificate chain (only the PEM parts)
openssl s_client -showcerts -connect ${HOST}:${PORT} -servername ${HOST} </dev/null 2>/dev/null | \
    awk '/BEGIN CERTIFICATE/,/END CERTIFICATE/' > /tmp/fullchain.pem

if [ ! -s /tmp/fullchain.pem ]; then
    echo "Error: Could not retrieve certificates"
    exit 1
fi

# Split into individual certificates
csplit -f /tmp/cert- -z /tmp/fullchain.pem '/-----BEGIN CERTIFICATE-----/' '{*}' >/dev/null 2>&1

CERT_FILES=(/tmp/cert-*)
CERT_COUNT=${#CERT_FILES[@]}

echo "✓ Found ${CERT_COUNT} certificate(s)"
echo ""

for i in "${!CERT_FILES[@]}"; do
    CERT_FILE="${CERT_FILES[$i]}"
    CERT_NUM=$((i + 1))

    # Get subject common name
    SUBJECT_CN=$(openssl x509 -in "$CERT_FILE" -noout -subject 2>/dev/null | \
        sed -n 's/.*CN[[:space:]]*=[[:space:]]*//p' | tr -d '\n')

    # Get issuer common name
    ISSUER_CN=$(openssl x509 -in "$CERT_FILE" -noout -issuer 2>/dev/null | \
        sed -n 's/.*CN[[:space:]]*=[[:space:]]*//p' | tr -d '\n')

    echo "[$CERT_NUM/$CERT_COUNT] Certificate"
    echo "  Subject CN: $SUBJECT_CN"
    echo "  Issuer CN:  $ISSUER_CN"

    # Determine destination based on certificate type
    if [ $CERT_NUM -eq 1 ]; then
        # Server certificate
        DEST_FILE="${CERT_DIR}/dirtgame-server.pem"
        TYPE="Server Certificate"
    elif echo "$SUBJECT_CN" | grep -qi "DigiCert Global Root"; then
        # Root CA
        DEST_FILE="${CERT_DIR}/digicert-root.pem"
        TYPE="Root CA"
    elif echo "$SUBJECT_CN" | grep -qi "DigiCert.*CA"; then
        # Intermediate CA
        DEST_FILE="${CERT_DIR}/digicert-intermediate.pem"
        TYPE="Intermediate CA"
    else
        # Default intermediate
        DEST_FILE="${CERT_DIR}/intermediate-${CERT_NUM}.pem"
        TYPE="Intermediate"
    fi

    echo "  Type:       $TYPE"

    # Copy certificate
    cp "$CERT_FILE" "$DEST_FILE"
    echo "  Saved to:   $DEST_FILE"
    echo ""
done

# Cleanup
rm -f /tmp/cert-* /tmp/fullchain.pem

echo "✅ Certificates updated successfully!"
echo ""
echo "Certificate files saved:"
echo "  - digicert-root.pem (DigiCert Global Root G2)"
echo "  - digicert-intermediate.pem (DigiCert TLS RSA SHA256 2020 CA1)"
echo "  - dirtgame-server.pem (www.dirtgame.com)"
