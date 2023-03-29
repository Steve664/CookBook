class Recipe < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy
  has_many :recipe_allergens, dependent: :destroy
  has_many :allergens, through: :recipe_allergens

  validates :title, presence: true
  validates :description, presence: true
  validates :instructions, presence: true
end
