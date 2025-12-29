input_csv = 'day5_input_test'
input = (open(input_csv))
input = input.read().strip().split('\n\n')
ranges = []
ingredients = []

##################### Input prep #####################
for range in input[0].split('\n'):
    ranges.append([int(x) for x in range.split('-')])

for ingredient in input[1].split('\n'):
    ingredients.append(ingredient)

print(ranges)
print (ingredients)

##################### Functions #####################
def ingredient_validator(ingredients, ranges):
    valid_ingredients = 0
    for ingredient in ingredients:
        for range in ranges:
            if int(ingredient) >= range[0] and int(ingredient) <= range[1]:
                print(f'Ingredient {ingredient} is between {range[0]} and {range[1]}')
                valid_ingredients += 1
                break
    return valid_ingredients

def ingredient_id_checker(ranges):
    valid_ids = 0
    new_ranges = []
    # Tel alle mogelijke ID's zonder dubbelingen (ranges kunnen overlappen)
    while len(ranges) > 0:
        for compare_range in ranges:
            # case 1: links overlappend (merge: min can range1 en max van range2)
                # (moet ook zelfde startpunt kunnen hebben)
                # range1:  5 -------- 15       :  5 -------- 20
                # range2:       10 -------- 20 :      10 --- 20

            # case 2: rechts overlappend (merge: min can range2 en max van range1)
                # (moet ook zelfde eindpunt kunnen hebben)
                # range1:       10 -------- 20 :
                # range2:  5 -------- 15       :

            # case 3: volledig overlappend (hou range1)
                # (geen uitzonderingen)
                # range1:  5 ------------- 25
                # range2:      10 -- 15

            # case 4: volledig binnenin -> hou range2
                # (kan ook 1 erbinnen en 1 hetzelfde)
                # range1:      10 -- 15       : 5 ------- 15       :      15 ------- 25
                # range2:  5 ------------- 25 : 5 ------------- 25 : 5 ------------- 25
    
            # case 5: geen overlap, voeg range 1 toe
            else:
                new_ranges.append(range)
    return valid_ids

##################### Main #####################
print(ingredient_validator(ingredients, ranges))
print(ingredient_id_checker(ranges))
