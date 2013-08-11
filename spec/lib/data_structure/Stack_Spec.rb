require 'spec_helper'

describe 'Stack' do

  before :each do
      @stack = Stack.new 10
      @stack.push 5
  end
  describe 'push' do
    it 'should place the value at the top of the stack' do
      @stack.peek.should eq 5

      @stack.push 3
      @stack.peek.should eq 3

      @stack.push 2
      @stack.peek.should eq 2

      @stack.push 50
      @stack.peek.should eq 50
    end

    it 'should not allow to push past the upper boundary' do
      (0..8).each{|i| @stack.push i}

      expect{@stack.push 10}.to raise_error "out of bounds"
      @stack.peek.should_not eq 10
    end
  end

  describe 'pop' do
    it 'should remove the top element' do
      (0..3).each{|i| @stack.push i}
      @stack.peek.should eq 3

      @stack.pop
      @stack.peek.should eq 2

      @stack.pop
      @stack.peek.should eq 1

      @stack.pop
      @stack.peek.should eq 0

      @stack.pop
      @stack.peek.should eq 5

      @stack.pop
      @stack.peek.should eq nil
    end

    it 'should not allow to pop an empty stack' do
      @stack.pop

      expect{@stack.pop}.to raise_error "can't pop empty stack"
    end
  end
end
