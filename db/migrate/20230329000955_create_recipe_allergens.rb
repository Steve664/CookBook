class CreateRecipeAllergens < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_allergens do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :allergen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
