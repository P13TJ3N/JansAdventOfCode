input_csv = 'day4_input'
input = (open(input_csv))
input = input.read().strip().split()
balen = []
start_baal = []
totaal_oppakbare_toiletpappier_balen = 0

##################### Input prep #####################
for i in range(len(input[0])+2):
    start_baal.append('.')

balen.append(start_baal)

for i in input:
    rij = ['.']
    for j in i:
        rij.append(j)
    rij.append('.')
    balen.append(rij)

balen.append(start_baal)
# for baal in balen:
#     print(baal)

# Assuming input is a square
start_index = 1
eind_index = len(start_baal) - 1

##################### Functions #####################
def check_buren(balen, row, col, buren_doel):
    check = False
    buren = 0
    plaatsen = [(-1, -1), (-1, 0), (-1, 1),
                (0, -1),          (0, 1),
                (1, -1),  (1, 0), (1, 1)]

    for plaats in plaatsen:
        buurplek = plaats[0] + row
        buurplek2 = plaats[1] + col
        if balen[buurplek][buurplek2] == '@':
            buren += 1
    if buren_doel > buren:
        check = True
    return check

def itteratorinator(balen, buren_doel, start_index):
    oppakbare_toiletpappier_balen = 0
    balen_resultaat = [row[:] for row in balen] # https://stackoverflow.com/questions/17873384/how-to-deep-copy-a-list
    for col_index in range(len(balen)-2):
        for row_index in range(len(balen)-2):
            if balen[col_index+start_index][row_index+start_index] == '@':
                if(check_buren(balen, col_index+start_index, row_index+start_index, buren_doel)):
                    oppakbare_toiletpappier_balen += 1
                    balen_resultaat[col_index+start_index][row_index+start_index] = 'X'
    return oppakbare_toiletpappier_balen, balen_resultaat

##################### Main #####################
balen_resultaat = [row[:] for row in balen] # https://stackoverflow.com/questions/17873384/how-to-deep-copy-a-list

buren_doel = 4
resultaat = itteratorinator(balen, buren_doel, start_index)
score = resultaat[0]
balen = [row[:] for row in resultaat[1]]
totaal_oppakbare_toiletpappier_balen += score
print(score)

while score > 0:
    resultaat = itteratorinator(balen, buren_doel, start_index)
    score = resultaat[0]
    balen = [row[:] for row in resultaat[1]]
    totaal_oppakbare_toiletpappier_balen += score

print(totaal_oppakbare_toiletpappier_balen)