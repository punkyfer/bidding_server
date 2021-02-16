#Contents of call.lua
request = function()
path = "/bid?position=" .. math.random(100000) .. "&publisherid=" .. math.random(100000)
return wrk.format(nil, path)
end
