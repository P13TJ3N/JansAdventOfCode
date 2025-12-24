# repeatig numbers are invalid ID's
# except when they have leading 0's
# the answer is the summ of all invalid id's

# part2:
# numers that have a repeating pattern are also invalid
# for example 123123 or 456456456, the repitirion cannot be a substring, it needs to be as long as the input number

# input_csv = 'day2_input'
input_csv = 'day2_input'
input = (open(input_csv).read())
input = input.split(',')
faulty_ids = 0
faulty_ids_2 = 0

def scan_for_pattern(input: str):
    number: str = '0'
    length = len(input)
    # Devide length by each possible chunk
    # Ignore if division is not whole number
    for i in range(1, (length//2) + 1):
        # print(f'dividing {input} into chunks of {i}')
        if length % i == 0:
            # https://www.geeksforgeeks.org/python/python-divide-string-into-equal-k-chunks/
            chunks = [input[c:c+i] for c in range(0, length, i)]
            # print(chunks)
            # check if all divisions in list are the same by making list a set
            # If set length is 1, all divisions are the same
            if len(set(chunks)) == 1:
                # print(f'found pattern: {chunks[0]}')
                number = input
                break
    return int(number)

for id in input:
    # print(id)
    id = id.split('-')
    start = int(id[0])
    eind = int(id[1])

    while start <= eind:
        # print('checking id:', start)
        text = str(start)
        midden = len(text) // 2
        half_1 = text[:midden]
        half_2 = text[midden:]
        
        if(half_1==half_2):
            # print(f'{half_1}{half_2}')
            # print('fault!')
            faulty_ids += int(f'{half_1}{half_2}')
            faulty_ids_2 += int(f'{half_1}{half_2}')
        else:
            faulty_ids_2 += scan_for_pattern(text)
        start+=1
print('-----------')
# print(scan_for_pattern('21212121'))
print(faulty_ids)
print(faulty_ids_2)