require 'spec_helper'

describe 'Binary_Search' do

  before :each do
    @bs = Binary_Search.new
    @collection = My_Container.new 100
  end
  describe 'search' do
    it 'should return the index of the value specified' do
      @bs.search(@collection, 5).should eq(5)
      @bs.search(@collection, 0).should eq(0)
      @bs.search(@collection, 99).should eq(99)
      @bs.search(@collection, 63).should eq(63)
    end

    it 'should return nil if the value is not found' do
      @bs.search(@collection, 100).should eq(nil)
      @bs.search(@collection, 135341).should eq(nil)
      @bs.search(@collection, -1).should eq(nil)
    end
  end

  describe 'recursive_search' do
    it 'should return the index of the value specified' do
      @bs.recursive_search(@collection, 5).should eq(5)
      @bs.recursive_search(@collection, 0).should eq(0)
      @bs.recursive_search(@collection, 99).should eq(99)
      @bs.recursive_search(@collection, 63).should eq(63)
    end

    it 'should return nil if the value is not found' do
      @bs.recursive_search(@collection, 100).should eq(nil)
      @bs.recursive_search(@collection, 135341).should eq(nil)
      @bs.recursive_search(@collection, -1).should eq(nil)
    end
  end
end
