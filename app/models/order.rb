class Order < ActiveRecord::Base
  belongs_to :showing

  #Validations
  validates :name, presence: { message: "Name is required" }
  validates :creditcardnum, presence: { message: "Credit Card Number is required" }
  validates_length_of :creditcardnum, :minimum => 16, :maximum => 16, message: "Credit Card Number is invalid"
  validates :expirationdate, presence: { message: "Expiration date is required" }
  validates :quantity, presence: { message: "Quantity is required" }
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "Email is invalid"
end
