class Api::AuditoriaController < ApplicationController
  def index
    @auditoria = Auditorium.order(:name)
    respond_to do |format|
      format.json { render json: @auditoria.to_json, status: 200 }
    end
  end

  def create
    @auditorium = Auditorium.create(auditoria_params)
    respond_to do |format|
      if @auditorium.save
        format.json { render json: @auditorium.to_json, status: 200 }
      else
        format.json { render json: @auditorium.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @auditorium = Auditorium.find(params[:id])
    respond_to do |format|
      if @auditorium.update(auditoria_params)
        format.json { render json: @auditorium.to_json, status: 200 }
      else
        format.json { render json: @auditorium.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @auditorium = Auditorium.find(params[:id])
    @auditorium.destroy
    respond_to do |format|
      if @auditorium.destroyed?
        format.json { render json: @auditorium.to_json, status: 200 }
      else
        format.json { render json: @auditorium.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def auditoria_params
    params.require(:auditorium).permit(:name, :capacity)
  end
end
