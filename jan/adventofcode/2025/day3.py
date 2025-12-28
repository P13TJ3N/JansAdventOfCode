# find largest number, and then the largest number to the left of it
# paste them together
# add to total_joltage

# input_csv = 'day3_input'

def joltage_finder_supreme(input: str, max_cell_count: int):
    input = input.read().strip().split()
    total_joltage = 0
    for cells in input:
        total_joltage_list = []
        cells_taken = 0
        while len(total_joltage_list) < max_cell_count:
            result = next_suiteable_number_index_finder(cells, cells_taken, max_cell_count)
            total_joltage_list.append(result[0])
            cells = ''.join([str(i) for i in result[1]])
            cells_taken += 1
        total_joltage += int(''.join([str(i) for i in total_joltage_list]))
    return total_joltage

def next_suiteable_number_index_finder(input: str, cells_taken: int, max_cell_count: int):
    input = list(input)
    cells = [int(i) for i in input]
    to_remove = max_cell_count - (cells_taken+1)
    max_list = cells[0:len(cells)-to_remove]
    highest_number = max(max_list)
    highest_number_index = cells.index(highest_number)
    leftover_cells = cells[highest_number_index+1:]
    return [highest_number,leftover_cells]

input_csv = 'day3_input'
input = (open(input_csv))
print(joltage_finder_supreme(input,2))
input = (open(input_csv))
print(joltage_finder_supreme(input,12))