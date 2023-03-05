import csv, os, codecs, collections
from pybars import Compiler

class TeamStanding():
    def __init__(this, position, upOrDown, team, points):
        this.position = position
        this.team = team
        this.points = points
    
    def __init__(this, csvRow):
        this.position = csvRow[0]
        this.team = csvRow[2]
        this.points = csvRow[-1]

class TeamStandings():
    def __init__(this, csvFilePath):
        this.standings = []
        this.name = str(os.path.basename(csvFilePath))[0:-4]

        with open(csvFilePath, mode='r') as infile:
            reader = csv.reader(infile)
            for rows in reader:
                if rows[0] != "Pos":
                    this.standings.append(TeamStanding(rows))

class CombineTeamStandings():
    def __init__(this, series1, series2):
        basePath = "hidden\\out"
        series1dir = os.path.join(basePath, series1)
        series2dir = os.path.join(basePath, series2)
        teamStandingsFiles1 = []
        teamStandingsFiles2 = []
        for file in os.scandir(series1dir):
            if "team" in file.name:
                teamStandingsFiles1.append(TeamStandings(file))

        for file in os.scandir(series2dir):
            if "team" in file.name:
                teamStandingsFiles2.append(TeamStandings(file))

        updatedSeriesStanding = {}
        updatedTeamStandings = {}

        for i in range(len(teamStandingsFiles1)):
            for x in range(len(teamStandingsFiles1[i].standings)):
                series2Standings = []
                for standing in teamStandingsFiles2[i].standings:
                    if standing.team == teamStandingsFiles1[i].standings[x].team:
                        series2Standings = standing

                oldPos1 = teamStandingsFiles1[i].standings[x].position
                oldPos2 = series2Standings.position

                oldPoints1 = teamStandingsFiles1[i].standings[x].points
                oldPoints2 = series2Standings.points

                newPoints = int(str(oldPoints1)) + int(str(oldPoints2))

                updatedTeamStandings[teamStandingsFiles1[i].standings[x].team] = newPoints
                
        
            updatedSeriesStanding[teamStandingsFiles1[i].name[0:teamStandingsFiles1[i].name.find("-")]] = collections.OrderedDict(sorted(updatedTeamStandings.items(), key=lambda kv: kv[1], reverse=True))
            updatedTeamStandings = {}

        compiler = Compiler()

        # Compile the template
        source = codecs.open("src\\output\\templates\\teamStandings.hbs", encoding="utf-8").read()
        template = compiler.compile(source)
        outputVar = []
        
        for standingsPage in updatedSeriesStanding:
            for team in updatedSeriesStanding[standingsPage]:
                out = {}
                out["name"] = team
                out["points"] = updatedSeriesStanding[standingsPage][team]
                out["previous"] = ""
                out["neutral"] = ""
                out["negative"] = ""
                out["drivers"] = ""
                out["weekPoints"] = ""
                out["budget"] = ""
                out["roster"] = ""
                out["captains"] = ""
                outputVar.append(out)
        print(outputVar)
        output = template({
            'teams': [
                outputVar
            ],
            'bestBuy':'',
            'prices': ''})

        print(output)
    
                

if __name__ == '__main__':
    combineTeamStandings = CombineTeamStandings("maintmaster-2wd", "maintmaster-4wd")