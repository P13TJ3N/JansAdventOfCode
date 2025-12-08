# find largest number, and then the largest number to the left of it
# paste them together
# add to total_joltage 

input_csv = 'day3_input'
input = (open(input_csv))

def joltage_finder(input):
    total_joltage = 0
    for cells in input:
        cells = cells.strip()
        print(cells)
        # convert cells to list of int
        numbers = []
        cells.split()
        for i in cells:
            numbers.append(int(i))
        
        first_number = 0
        second_number = 0
        
        # find position of earliest highest number of cells
        print(max(numbers))
        highest_position_index = numbers.index(max(numbers))
        print(f'{highest_position_index} == {len(numbers)-1} = {highest_position_index == len(numbers)-1}')

        # if highest number position == length of array (is last number):
        if (highest_position_index == len(numbers)-1):
            # last number is second number
            second_number = numbers[len(numbers)-1]
            # find second highest number, make that first number
            numbers.pop(-1)
            print(numbers)
            first_number = max(numbers)

        else:  
            #first number = highest number
            first_number = numbers[highest_position_index]
            second_number_list = numbers[highest_position_index:]
            second_number_list.pop()
            print(second_number_list)
            second_number = max(second_number_list)

            #split array after first instance of highest number
            # highest number in array after highest number is second number
        total_joltage += int(f'{first_number}{second_number}')
        print(f'{first_number}{second_number}')
        print('--------')
    return total_joltage

print(joltage_finder(input))
