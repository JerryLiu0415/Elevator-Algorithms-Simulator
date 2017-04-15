  ## How to run
  1. Runing on localhost using "npm start"
  2. Default floor distrubution model is not realistic, ground floor should have a higher rate of getting called.
  
  ## Screen Captures and description
  ![alt tag](https://github.com/JerryLiu0415/Elevator-Algorithms-Simulator/blob/master/screen%20captures/setting.jpeg)
  
  ![alt tag](https://github.com/JerryLiu0415/Elevator-Algorithms-Simulator/blob/master/screen%20captures/animation.jpeg)
  
  ![alt tag](https://github.com/JerryLiu0415/Elevator-Algorithms-Simulator/blob/master/screen%20captures/stat.jpeg)
    
  ![alt tag](https://github.com/JerryLiu0415/Elevator-Algorithms-Simulator/blob/master/screen%20captures/stat2.jpeg)
 
  ## Best plan find so far
  The algorithm "LeastCalledFirst" works suprisingly well on average. It simply picks the elevator with the least number of passangers uing it. Compared to "convenient first" which is used by most of the traditional elevators in real life, it balances the useage of elevators when people are comming in a large group, which could result in a situation which you can't get on the elevator during rush hours.
  
  ## Limitations and imporvements
  1. Passengers may interupt a closing door which is not implemented.
  2. Too few algorithms I could come up on my own.
  3. Not good UI since first time using Angular.
  4. In the next version, I will add dynamic model feature which totally simulate the trafic flow of an specific building in a day. 
  5. In the next version, I will add mining feature that can extract a trafic pattern during training time.
  6. Allow user select building height and number of elevators.
  
