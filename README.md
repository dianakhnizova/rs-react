# My App

Climate Data Viewer

## Performance Profiling

Initial profiling was performed using **React DevTools Profiler**.

- **Tested interactions:**
  - Sorting a column
  - Searching for a country
  - Selecting a year
  - Adding/removing columns
  

 - **Before optimization:** 

  - Sorting a column
  **Commit Duration:** : 2s
  **Render Duration:** : 2.7ms
  **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### Screenshots

#### Flame Graph
![Profiler Flame Graph](docs/images/flame-sort-before.png)

#### Ranked Chart
![Profiler Ranked Chart](docs/images/ranked-sort-before.png)

  - Searching for a country
  **Commit Duration:** : 2.8s
  **Render Duration:** : 1ms
  **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

  ### Screenshots

#### Flame Graph
![Profiler Flame Graph](docs/images/flame-search-before.png)

#### Ranked Chart
![Profiler Ranked Chart](docs/images/ranked-search-before.png)

  - Selecting a year
  **Commit Duration:** : 1.7s
  **Render Duration:** : 67.8ms
  **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

  ### Screenshots

#### Flame Graph
![Profiler Flame Graph](docs/images/flame-year-before.png)

#### Ranked Chart
![Profiler Ranked Chart](docs/images/ranked-year-before.png)

  - Adding/removing columns
  **Commit Duration:** : 1s
  **Render Duration:** : 51.2ms
  **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

  ### Screenshots

#### Flame Graph
![Profiler Flame Graph](docs/images/flame-column-before.png)

#### Ranked Chart
![Profiler Ranked Chart](docs/images/ranked-column-before.png)


---

> Overall performance is acceptable. The main bottleneck is re-rendering the entire table when state changes (especially column updates).  
> Possible improvements: memoization of rows, virtualization for large datasets.
