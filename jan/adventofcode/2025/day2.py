# repeatig numbers are invalid ID's
# except when they have leading 0's
# the answer is the summ of all invalid id's

input_csv = 'day2_input'
input = (open(input_csv).read())
input = input.split(',')
faulty_ids = 0

for id in input:
    # print(id)
    id = id.split('-')
    start = int(id[0])
    eind = int(id[1])
    while start <= eind:
        text = str(start)
        midden = len(text) // 2
        half_1 = text[:midden]
        half_2 = text[midden:]

        if(half_1==half_2):
            print(f'{half_1}{half_2}')
            print('fault!')
            faulty_ids += int(f'{half_1}{half_2}')
        start+=1

print(faulty_ids)