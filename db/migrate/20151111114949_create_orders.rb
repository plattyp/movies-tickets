class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :name
      t.string :email
      t.string :creditcardnum
      t.date :expirationdate
      t.integer :quantity
      t.integer :showing_id

      t.timestamps null: false
    end
  end
end
