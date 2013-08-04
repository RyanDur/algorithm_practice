require 'spec_helper'

describe 'Linear_Search' do

  before :each do
    @container = My_Container.new [2,34,5,6,8,12,3,5,5,6,3]
    @search = Linear_Search.new
  end

  describe 'find_first' do
    it 'should return the first index position of the number given' do
      @search.find_first(3, @container).should eq(6)
      @search.find_first(5, @container).should eq(2)
      @search.find_first(12, @container).should eq(5)
    end

    it 'should retunr nil if there are no matches' do
      @search.find_first(100, @container).should eq(nil)
    end
  end

  describe 'recursive_find_first' do
    it 'should return the first index position of the number given' do
      @search.recursive_find_first(3, @container, 0).should eq(6)
      @search.recursive_find_first(5, @container, 0).should eq(2)
      @search.recursive_find_first(2, @container, 0).should eq(0)
      @search.recursive_find_first(34, @container, 0).should eq(1)
      @search.recursive_find_first(12, @container, 0).should eq(5)
    end

    it 'should retunr nil if there are no matches' do
      @search.recursive_find_first(100, @container, 0).should eq(nil)
    end
  end

  describe 'find_all' do
    it 'should return the set indexs of the value given' do
      @search.find_all(5, @container).should eq([2,7,8])
      @search.find_all(3, @container).should eq([6,10])
    end

    it 'should return nil if no matches found' do
      @search.find_all(1, @container).should eq(nil)
    end
  end

  describe 'recursive_find_all' do
    it 'should return the set indexs of the value given' do
      @search.recursive_find_all(5, @container.copy, 0).should eq([2,7,8])
      @search.recursive_find_all(3, @container.copy, 0).should eq([6,10])
    end

    it 'should return nil if no matches found' do
      @search.recursive_find_all(1, @container.copy, 0).should eq(nil)
    end
  end
end
