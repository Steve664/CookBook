# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# create allergens
allergen1 = Allergen.create(name: "Peanuts")
allergen2 = Allergen.create(name: "Shellfish")
allergen3 = Allergen.create(name: "Eggs")

# create users
user1 = User.create(name: "John Smith", email: "john@example.com", password: "password")
user2 = User.create(name: "Jane Doe", email: "jane@example.com", password: "password")

# create recipes
recipe1 = Recipe.create(title: "Peanut Butter Sandwich", description: "A classic sandwich made with peanut butter", image:"https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium", instructions: "Spread peanut butter on bread and enjoy!", user: user1)
recipe2 = Recipe.create(title: "Shrimp Scampi", description: "A delicious pasta dish with shrimp and garlic", image:"https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium", instructions: "Cook pasta according to package directions. Saute garlic and shrimp in olive oil. Add to pasta and enjoy!", user: user2)

# associate allergens with recipes
RecipeAllergen.create(recipe: recipe1, allergen: allergen1)
RecipeAllergen.create(recipe: recipe2, allergen: allergen2)

# create reviews
review1 = Review.create(rating: 5, content: "This sandwich was amazing!", recipe: recipe1, user: user2)
review2 = Review.create(rating: 4, content: "I loved the shrimp scampi, but it was a bit too garlicky for me", recipe: recipe2, user: user1)
