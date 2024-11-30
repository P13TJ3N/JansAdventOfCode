stack1 = ["H","R","B","D","Z","F","L","S"]
stack2 = ["T","B","M","Z","R"]
stack3 = ["Z","L","C","H","N","S"]
stack4 = ["S","C","F","J"]
stack5 = ["P","G","H","W","R","Z","B"]
stack6 = ["V","J","Z","G","D","N","M","T"]
stack7 = ["G","L","N","W","F","S","P","Q"]
stack8 = ["M","Z","R"]
stack9 = ["M","C","L","G","V","R","T"]
stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9]

total_score = ""

import re

def containter_printer(stacks):
    # find longest stack
    heighest_stack_height = 0
    for i in range(len(stacks)):
        heighest_stack_height = max(heighest_stack_height, len(stacks[i]))
    heighest_stack = max(range(len(stacks)), key=lambda i: len(stacks[i])) + 1

    # print from top to bottom
    for i in range(heighest_stack_height, -1, -1):
        row = ""
        for stack in stacks:
            if i > len(stack) - 1:
                row += "   "
            else:
                row += "[" + stack[i] + "]"
        print(row)
        if i == 0:
            print("[1][2][3][4][5][6][7][8][9]")

def container_mover(amount, from_stack, to_stack):
    # get amount from the end of the from_stack
    to_move = stacks[from_stack][-amount:]
    new_amount = len(to_move)

    # overwrite to_stack with append to end 
    to_stack = stacks[to_stack] + to_move
    stacks[to_stack] = to_stack

    # remove amount from from_stack and save to array
    from_stack = stacks[from_stack][:-new_amount]
    stacks[from_stack] = from_stack

# read input.txt line by line
with open("input.txt") as file:
    for line in file:
        print("\033[H\033[J")  # clear console
        containter_printer(stacks)
        print(line)
        input_ = [int(x) for x in re.findall(r"\b\d+\b", line)]
        container_mover(input_[0], input_[1] - 1, input_[2] - 1)

# do something after final line
containter_printer(stacks)
for stack in stacks:
    if len(stack) == 0:
        total_score += " "
    else:
        total_score += stack[-1]
print(f"the total is {total_score}")
