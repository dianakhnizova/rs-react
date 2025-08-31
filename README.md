# My App

Climate Data Viewer

## Performance Profiling

Initial profiling was performed using **React DevTools Profiler**.

- **Tested interactions:**
  - Sorting a column
  - Searching for a country
  - Selecting a year
  - Adding/removing columns
  

 ## Before optimization

  ### - Sorting a column:

  - **Commit Duration: 2s**
  - **Render Duration: 2.7ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for sorting
![Profiler Flame Graph](docs/images/flame-sort-before.png)

#### Ranked Chart for sorting
![Profiler Ranked Chart](docs/images/ranked-sort-before.png)

  ### - Searching for a country:

  - **Commit Duration: 2.8s**
  - **Render Duration: 1ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for search
![Profiler Flame Graph](docs/images/flame-search-before.png)

#### Ranked Chart for search
![Profiler Ranked Chart](docs/images/ranked-search-before.png)

  ### - Selecting a year:

  - **Commit Duration: 1.7s**
  - **Render Duration: 67.8ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for year
![Profiler Flame Graph](docs/images/flame-year-before.png)

#### Ranked Chart for year
![Profiler Ranked Chart](docs/images/ranked-year-before.png)

  ### - Adding/removing columns:

  - **Commit Duration: 1s**
  - **Render Duration: 51.2ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for columns
![Profiler Flame Graph](docs/images/flame-column-before.png)

#### Ranked Chart for columns
![Profiler Ranked Chart](docs/images/ranked-column-before.png)


 ## After optimization

  ### - Sorting a column:

  - **Commit Duration: 1.8s**
  - **Render Duration: 3.4ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for sorting
![Profiler Flame Graph](docs/images/flame-sort-after.png)

#### Ranked Chart for sorting
![Profiler Ranked Chart](docs/images/ranked-sort-after.png)

  ### - Searching for a country:

  - **Commit Duration: 1.1s**
  - **Render Duration: 0.6ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for search
![Profiler Flame Graph](docs/images/flame-search-after.png)

#### Ranked Chart for search
![Profiler Ranked Chart](docs/images/ranked-search-after.png)

  ### - Selecting a year:

  - **Commit Duration: 0.5s**
  - **Render Duration: 48.5ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for year
![Profiler Flame Graph](docs/images/flame-year-after.png)

#### Ranked Chart for year
![Profiler Ranked Chart](docs/images/ranked-year-after.png)

  ### - Adding/removing columns:

  - **Commit Duration: 1s**
  - **Render Duration: 50ms**
  - **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)

### - Screenshots:

#### Flame Graph for columns
![Profiler Flame Graph](docs/images/flame-column-after.png)

#### Ranked Chart for columns
![Profiler Ranked Chart](docs/images/ranked-column-after.png)

---

> Overall performance is acceptable. The main bottleneck is re-rendering the entire table when state changes (especially column updates).  
> Possible improvements: memoization of rows, virtualization for large datasets.
