class TestMailUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :test_email
end