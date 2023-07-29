export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const result = await res.json();
            this.title = result.recipe.title;
            this.author = result.recipe.publisher;
            this.img = result.recipe.image_url;
            this.url = result.recipe.source_url;
            this.ingredients = result.recipe.ingredients;
            this.authorSource = result.recipe.publisher_url;
            // console.log(result);
            // console.log(`title : ${this.title}, and authorName : ${this.author},  and img: ${this.img}, and url : ${this.url}, items :  ${this.ingredients}, auhorS: ${this.authorSource}`)
        } catch (error) {
            console.log(error)
        }
    }


    calcTime() {
        let numIng = this.ingredients.length;
        let periods = Math.ceil(numIng / 3);
        this.time = periods * 15
    }

    calcServing() {
        this.servings = 4;
    }

    changeIngredients() {
        const unitLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound', 'ounces', 'ounce', 'kilograms', 'kilogram', 'grams', 'gram', 'liters', 'liter', 'milliliters', 'milliliter']
        const unitShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'lbs', 'lb', 'oz', 'oz', 'kg', 'kg', 'g', 'g', 'l', 'l', 'ml', 'ml']

        const newIngredients = this.ingredients.map(el => {

            let ing = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ing = ing.replace(unit, unitShort[i]);
            })
            // ing = ing.replace(/[\])}[{(]/g, '');
            ing = ing.replace(/ \([^()]*?(oz|g|ml)\)/i, ' ')
            const arrIng = ing.split(' ');
            const indexUnit = arrIng.findIndex(el2 => unitShort.includes(el2));
            let obj;
            if (indexUnit > -1) {
                const arrCount = arrIng.slice(0, indexUnit);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'))
                }
                else {
                  count = eval(arrIng.slice(0, indexUnit).join('+')); 
                }

                obj = {
                    count,
                    unit: arrIng[indexUnit],
                    ing: arrIng.slice(indexUnit + 1).join(' ')
                }
            }
            else if (parseInt(arrIng[0], 10)) {
                obj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ing: arrIng.slice(1).join(' ')
                }
            }
            else if (indexUnit === -1) {
                obj = {
                    count: 1,
                    unit: '',
                    ing
                }
            }


            // console.log(arrIng, indexUnit)
            return obj

            // ingredient.replace(/ \([^()]*?(oz|g|ml)\)/i, ''),
        })

        this.ingredients = newIngredients;
    }
    updateServing(type) {
        const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;
 
        this.ingredients.forEach(el => {
            el.count *= (newServing / this.servings);
        })

        this.servings = newServing;
    }
}
 