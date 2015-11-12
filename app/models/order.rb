class Order < ActiveRecord::Base
  belongs_to :showing

  #Validations
  validates_presence_of :name, :creditcardnum, :expirationdate, :quantity
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
end
