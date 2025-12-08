# rotating dail from 0 to 99
# rotating left means adding numbers
# rotating right means subtracting numbers
# after 99 comes 0 (circle)
# dail starts at 50
# input says how far left or right the dail should go
# the amount of times the dial is at 0 is the password
# password to the test input below is 3
# 2028 too low for past 2

input_csv = 'day1_input'
# input = ["L68","L30","R48","L5","R60","L55","L1","L99","R14","L82"]
dail_position = 50

input = open(input_csv,'r')


def decode(dail_position,input):
    password_1 = 0
    password_2 = 0
    for rotation in input:
        result = get_rotation(rotation)
        dail_position += result[0]
        password_2 += result[1]
        if(dail_position>99):
            dail_position -= 100
            password_2+=1
        if(dail_position < 0):
            dail_position+=100
            password_2+=1
        if dail_position == 0:
            password_1+=1
        print(dail_position)
        # print('-----')

    return password_1, password_2

def get_rotation(instruction):
    rotation_number = int(instruction[1:])
    clicks = rotation_number // 100
    if rotation_number > 99:
        rotation_number = rotation_number%100
    if(instruction[0]=="L"):
        rotation_number = rotation_number*-1
    return rotation_number,clicks

password = decode(dail_position,input)
print(password)