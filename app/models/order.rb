class Order < ActiveRecord::Base
  belongs_to :showing

  #Validations
  validates :name, presence: { message: "Name is required" }
  validates :creditcardnum, presence: { message: "Credit Card Number is required" }
  validates_length_of :creditcardnum, :minimum => 16, :maximum => 16, message: "Credit Card Number is invalid"
  validates :expirationdate, presence: { message: "Expiration date is required" }
  validates :quantity, presence: { message: "Quantity is required" }, numericality: { only_integer: true, greater_than: 0 }
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "Email is invalid"
  validate :quantity_cannot_be_greater_than_tickets_available, on: :create
  validate :created_date_must_be_before_showtime, on: :create

  # Ensure that the quantity requested does not exceed tickets available
  def quantity_cannot_be_greater_than_tickets_available
  	remaining_ticket_count = showing.tickets_remaining
  	if quantity != nil && quantity > remaining_ticket_count
  		errors.add(:quantity, "There are not enough tickets available (#{remaining_ticket_count} Remaining)")
  	end
  end

  # Ensure the order can't occur after the show time as already occured
  def created_date_must_be_before_showtime
    unless showing.tickets_available
      errors.add(:created_at, "The showing you are trying to purchase is no longer available")
    end
  end

  # filters orders based on criteria
  def self.all_filtered(args = {})
    movie_id = args[:movie_id]
    self.joins(:showing)
        .where("? IS NULL OR showings.movie_id = ?",movie_id, movie_id)
        .order(:created_at)
  end
end
