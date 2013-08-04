require 'spec_helper'

describe 'My_Container' do

  before :each do
    @container = My_Container.new(10)
  end

  describe 'initialize with number' do
    it 'should create a container of the size given' do
      @container.size.should eq(10)
    end

    it 'should not leave any position within it nil' do
      @container.contains?(nil).should be_false
    end

    it 'should populate the container with numbers from 0 to the size-1' do
      for num in 0..@container.size-1
        @container.contains?(num).should be_true
      end
    end
  end

  describe 'initialize with array' do
    it "should create an instance with the array provided" do
      container = My_Container.new([1,1,1])
      container.should be_an_instance_of My_Container
      container.size.should eq(3)

      (0...container.size).each do |num|
        container.get_at(num).should eq(1)
      end
    end
  end

  describe 'insert' do
    it "should insert a value into the container" do
      @container.contains?(11).should be_false
      @container.insert(11)
      @container.contains?(11).should be_true
    end
  end

  describe 'size' do
    it 'should return te size of the container' do
      @container.size.should eq(10)
      @container.size.should_not eq(9)
    end
  end

  describe 'contains?' do
    it 'should return true if the container contains the number' do
      @container.contains?(5).should be_true
      @container.contains?(9).should be_true
      @container.contains?(3).should be_true
    end

    it 'should return true if the container contains the number' do
      @container.contains?(15).should be_false
      @container.contains?(29).should be_false
      @container.contains?(33).should be_false
    end
  end

  describe 'delete_at' do
    it 'should delete the value at the given index' do
      @container.contains?(3).should be_true
      @container.delete_at(3)
      @container.contains?(3).should be_false
    end

    it 'should close the gap created by the deletion by shifting the contents down' do
      @container.delete_at(3)
      @container.contains?(nil).should be_false
      @container.size.should eq(9)
    end

    it 'should return the value deleted' do
      @container.delete_at(5).should eq(5)
    end
  end

  describe 'get_at' do
    it 'it should return the value at the given index' do
      @container.get_at(0).should eq(0)
      @container.get_at(5).should eq(5)
    end
  end

  describe 'insert_at' do
    it 'should insert the number given at the index given' do
      @container.insert_at(15,3)
      @container.get_at(3).should eq(15)
    end

    it 'should shift the contents up to accomodate the insertion' do
      ary = [1,5,2,7,5]
      con = My_Container.new(ary)
      con.size.should eq(5)

      index = 2
      con.insert_at(33,index)
      con.get_at(1).should eq(5)
      con.size.should eq(6)
      con.contains?(nil).should be_false

      (index...ary.size).each do |num|
        con.get_at(num+1).should eq(ary[num])
      end
    end
  end
end
