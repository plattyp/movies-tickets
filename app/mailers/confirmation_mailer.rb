class ConfirmationMailer < ApplicationMailer
  default from: ENV["smtp_default_email"]

  def order_confirmation_email(order)
    @order = order
    @showing = @order.showing
    @movie = @showing.movie
    @auditorium = @showing.auditorium
    mail(to: @order.email, subject: "Ticket purchase confirmation (#{@movie.title})")
  end
end
