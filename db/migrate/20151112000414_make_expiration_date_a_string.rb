class MakeExpirationDateAString < ActiveRecord::Migration
  def change
    change_column :orders, :expirationdate, :string
  end
end
