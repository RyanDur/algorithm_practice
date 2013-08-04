require 'spec_helper'

describe 'Linear_Search' do

  before :each do
    @container = My_Container.new [2,34,5,6,8,12,3,5,5,6,3]
    @search = Linear_Search.new @container
  end

  describe 'find' do
    it 'should return the indexs of the value given' do
      @search.find(5).should eq([2,7,8])
      @search.find(3).should eq([6,10])
    end

    it 'should return an empty array if no matches found' do
      @search.find(1).should eq([])
    end
  end
end
