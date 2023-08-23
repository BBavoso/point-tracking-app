import csv
import base64
import json

csvPath = "json-builder/points.csv"
URL = "https://bbavoso.github.io/point-tracking-app/"

toWrite = {"objectives": []}

with open(csvPath, newline="") as pointscsv:
    reader = csv.DictReader(pointscsv)
    for row in reader:
        toWrite["objectives"].append(row)

jsonString = json.dumps(toWrite)
base64Encoded = base64.b64encode(jsonString.encode())
# print(base64Encoded)

print(URL, "?objectives=", base64Encoded.decode(), sep="")
