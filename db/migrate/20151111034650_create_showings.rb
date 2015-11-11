class CreateShowings < ActiveRecord::Migration
  def change
    create_table :showings do |t|
      t.datetime :showtime
      t.integer :movie_id
      t.integer :auditorium_id

      t.timestamps null: false
    end
  end
end
