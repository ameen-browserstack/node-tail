a = File.open("inp","w");                                                       
                                                                                
i = 0                                                                           
loop do                                                                         
  a.write("\nThis is line " + i.to_s)                                           
  a.flush                                                                       
  i+=1                                                                          
  sleep 0.5                                                                     
end   
