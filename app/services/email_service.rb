require 'resque/errors'

module RetriedJob
  def on_failure_retry(e, *args)
    puts "Performing #{self} caused an exception (#{e}). Retrying..."
    $stdout.flush
    Resque.enqueue self, *args
  end
end

class EmailService
  extend RetriedJob

  attr_reader :order
  @queue = :email

  def initialize(order_id)
    @order = Order.find_by_id(order_id)
  end

  def self.perform(key)
    (new key).send_confirmation_email
  rescue Resque::TermException
    Resque.enqueue(self, key)
  end

  def send_confirmation_email
    ConfirmationMailer.order_confirmation_email(order).deliver_now
  end
end