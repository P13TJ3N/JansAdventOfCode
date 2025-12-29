input_csv = 'day4_input'
input = (open(input_csv))
input = input.read().strip().split()
balen = []
start_baal = []
oppakbare_toiletpappier_balen = 0

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
        print(balen[buurplek][buurplek2])
        if balen[buurplek][buurplek2] == '@':
            buren += 1
            # print("Buur gevonden op: ", buurplek, buurplek2, "aantal buren is nu", buren)
    if buren_doel > buren:
        print("Aantal buren:", buren, "is minder dan doel:", buren_doel)
        check = True
        print(check)
    return check

##################### Main #####################
balen_resultaat = [row[:] for row in balen] # https://stackoverflow.com/questions/17873384/how-to-deep-copy-a-list

buren_doel = 4
for col_index in range(len(balen)-2):
    for row_index in range(len(balen)-2):
        if balen[col_index+start_index][row_index+start_index] == '@':
            print("cecking:", col_index+start_index, row_index+start_index)
            if(check_buren(balen, col_index+start_index, row_index+start_index, buren_doel)):
                oppakbare_toiletpappier_balen += 1
                balen_resultaat[col_index+start_index][row_index+start_index] = 'X'

print(oppakbare_toiletpappier_balen)

# for baal_copie in balen_resultaat:
#     print(''.join(baal_copie))

# for baal in balen:
#     print(''.join(baal))