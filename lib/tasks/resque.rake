require 'resque/tasks'

task 'resque:setup' => :environment

task "resque:setup" do
      ENV['QUEUE'] = '*'
end