# SomaiyaSat Priority Queue Lab

A Data Structures mini project demonstrating an **array-based priority queue** for satellite communication scheduling.

**Course topic:** Unit 2.3 — Priority Queue  
**Use case:** KJS-SRS-01 — SomaiyaSat and SomaiyaPod  
**Author:** Het Faldu · KJSSE · A1

## Features

- Add TT&C, SSTV, Codec2, and M17 packet records.
- Schedule TT&C first (P1), SSTV next (P2), and Codec2/M17 last (P3).
- Preserve FIFO order among equal-priority packets.
- Simulate transmission, view pending packets, and display the last five transmissions.
- Demonstrate an eight-packet capacity, empty queues, and full queues.
- Read an explanation of the algorithm and download its standalone C implementation.

The browser runs HTML, CSS, and JavaScript. `queue.c` is a matching standalone C program; the browser does not execute C. There is no trained AI, actual satellite connection, or persistent storage.

## Files

| File | Purpose |
|---|---|
| index.html | Dashboard structure and theory tab |
| style.css | Responsive visual design |
| queue.js | Array-based priority queue |
| app.js | Buttons, rendering, counters, and transmission log |
| queue.c | Standalone C implementation |

## Run the website locally

Serve this folder using VS Code Live Server or an HTTP server. For example, with Python installed:

```sh
python -m http.server 8000
```

Open http://localhost:8000. Use an HTTP server because the JavaScript files use ES modules.

## Run the C version

```sh
gcc -std=c11 -Wall -Wextra -pedantic queue.c -o queue
```

Windows PowerShell: `.\queue.exe`  
Linux/macOS: `./queue`

## Algorithm

Insertion shifts lower-priority packets right, then places the new packet in the gap. The strict `>` comparison preserves FIFO for ties. Deletion removes index 0 and shifts remaining packets left.

| Operation | Worst-case time |
|---|---|
| Enqueue | O(n) |
| Dequeue | O(n) |
| Peek | O(1) |
| Display | O(n) |

The C array uses O(capacity) storage and O(1) extra space per insertion/deletion. Capacity is eight for this demo.

## Quick demonstration

Click **Load example**. Arrival order is M17, SSTV, TT&C, Codec2, TT&C. Transmission order becomes packet IDs **3, 5, 2, 1, 4**. Transmit packets, fill the queue, and reset it. Refreshing the page restores the initial samples.

## Publish using GitHub Pages

Upload the extracted files to the repository root, with `index.html` at the top level. In repository Settings, open Pages, choose deployment from a branch, and select your default branch and the root folder. GitHub Pages availability depends on repository visibility and your GitHub plan.
