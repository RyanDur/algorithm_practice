require 'spec_helper'

describe 'Linear_Search' do

  before :each do
    @container = My_Container.new [2,34,5,6,8,12,3,5,5,6,3]
    @search = Linear_Search.new
  end

  describe 'find' do
    it 'should return the indexs of the value given' do
      @search.find(5, @container).should eq([2,7,8])
      @search.find(3, @container).should eq([6,10])
    end

    it 'should return an empty array if no matches found' do
      @search.find(1, @container).should eq([])
    end
  end

  describe 'recursive_find' do
    it 'should return the indexs of the value given' do
      @search.recursive_find(5, @container.copy).should eq([8,7,2])
      @search.recursive_find(3, @container.copy).should eq([10,6])
    end

    it 'should return an empty array if no matches found' do
      @search.recursive_find(1, @container.copy).should eq([])
    end
  end
end
