import requests
from bs4 import BeautifulSoup

measurements = {"cup", "cups", "ounce", "ounces", "teaspoon", "teaspoons", "tablespoon", "tablespoons", "each", "eaches", "lb", "lbs", "pound", "pounds", "gram", "grams", "tbsp.", "tsp.", "c."}

def parse_ingredients_allrecipes(ingredient_list):
    result = []
    for ingredient in ingredient_list:
        strings = ingredient.stripped_strings
        for string in strings:
            s = string.replace('(', '')
            s = s.replace(')', '')
            sentence = s.split()

            if sentence[0][0].isdigit(): #Detects if it is an ingredient, not a heading
                amount = []
                measurement = []
                item = []
                for word in sentence:
                    if word[0].isdigit():
                        amount.append(word)
                    elif word in measurements:
                        measurement.append(word)
                    else:
                        item.append(word)
                result.append((" ".join(amount), " ".join(measurement), " ".join(item)))
    #print(result)
    return result

def parse_ingredients_helper_1(list):
    result = []
    for object in list:
        strings = object.stripped_strings
        for string in strings:
            result.append(string)
    return result

def parse_ingredients_norecipes(amounts, measurements, items):
    amounts_list = parse_ingredients_helper_1(amounts)
    measurements_list = parse_ingredients_helper_1(measurements)
    items_list = parse_ingredients_helper_1(items)
    result = [None] * len(amounts)
    for i in range(0, len(amounts_list)):
        result[i] = (amounts_list[i], measurements_list[i], items_list[i])
    return result

def parse_ingredients_helper_2(list):
    result1 = []
    result2 = []
    for object in list:
        strings = object.stripped_strings
        for string in strings:
            strs = string.split("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")
            amount = strs[0].strip()
            result1.append(amount)
            if len(strs) > 1:
                measurement = strs[1]
                result2.append(measurement)
            else:

                result2.append("")
    return result1, result2

"""def parse_ingredients_delish(amount_list, item_list):
    amounts, measurements = parse_ingredients_helper_2(amount_list)
    items = parse_ingredients_helper_1(item_list)
    #print(amounts)
    print(len(measurements))
    #print(items)
    result = [None] * len(amounts)
    for i in range(0, len(amounts)):
        result[i] = (amounts[i], measurements[i], items[i])
    return result"""

def parse_ingredients_delish(objects):
    result = []
    for object in objects:
        strings = object.stripped_strings
        amount = ""
        measurement = ""
        item = ""
        for string in strings:
            strs = string.split("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")
            if strs[0][0].isdigit():
                amount = strs[0].strip()
                if len(strs) > 1:
                    measurement = strs[1]
            else:
                item = strs[0]
        result.append((amount, measurement, item))
    return result

url = 'https://norecipes.com/peanut-butter-cookies-recipe/'

r = requests.get(url)

page_html = r.content.decode()

parsed = BeautifulSoup(page_html, "html.parser")

#Particulars of allrecipes: only use formats such as https://www.allrecipes.com/recipe/281725/pumpkin-snickerdoodle-bundt-cake/
if "allrecipes" in url:
    ingredient_list_1 = parsed.find(id="lst_ingredients_1")

    if ingredient_list_1 != None and len(ingredient_list_1) != 0:
        ingredient_list_2 = parsed.find(id="lst_ingredients_2")
        ingredient_list_3 = parsed.find(id="lst_ingredients_3")

        labels_1 = ingredient_list_1.find_all("label")
        tuples = parse_ingredients_allrecipes(labels_1)
        if ingredient_list_2 != None:
            labels_2 = ingredient_list_2.find_all("label")
            tuples += parse_ingredients_allrecipes(labels_2)

        if ingredient_list_3 != None:
            labels_3 = ingredient_list_3.find_all("label")
            tuples += parse_ingredients_allrecipes(labels_3)

        print(tuples)
    else:
        print("Unsupported format for allrecipes")
elif "norecipes" in url:
    amount_list = parsed.find_all(attrs={"class":"wprm-recipe-ingredient-amount"})

    if amount_list != None and len(amount_list) != 0:
        measurement_list = parsed.find_all(attrs={"class":"wprm-recipe-ingredient-unit"})
        item_list = parsed.find_all(attrs={"class":"wprm-recipe-ingredient-name"})
        tuples = parse_ingredients_norecipes(amount_list, measurement_list, item_list)
        print(tuples)
    else:
        print("Unsupported format for norecipes")
#Particulars of delish: Sometimes there are no amount or measurement returned, simply the description
elif "delish" in url:
    object_list = parsed.find_all(attrs={"class":"ingredient-item"})
    if object_list != None and len(object_list) != 0:
        tuples = parse_ingredients_delish(object_list)
        print(tuples)
    else:
        print("Unsupported format for delish")
else:
    print("Unsupported website")
