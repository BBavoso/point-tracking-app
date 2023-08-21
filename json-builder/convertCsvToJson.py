import csv
import os

csvPath = "json-builder/points.csv"
jsonPath = "src/points.json"

toWrite = {"objectives": []}

with open(csvPath, newline="") as pointscsv:
    reader = csv.DictReader(pointscsv)
    for row in reader:
        toWrite["objectives"].append(row)

with open(jsonPath, "w") as jsonfile:
    jsonString = str(toWrite).replace("'", '"')
    jsonfile.write(str(jsonString))

os.system(f"npx prettier {jsonPath} --write --log-level silent")
