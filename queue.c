#include <stdio.h>
#define MAX 8

typedef struct {
    int id, mode, priority;
} Packet;

Packet queue[MAX];
int count = 0, nextId = 1;
const char *names[] = {"", "TT&C", "SSTV", "Codec2", "M17"};

int enqueue(int mode) {
    if (count == MAX || mode < 1 || mode > 4) return 0;
    Packet packet = {nextId++, mode, mode < 3 ? mode : 3};
    int i = count - 1;
    /* Strict comparison preserves arrival order for equal priorities. */
    while (i >= 0 && queue[i].priority > packet.priority) {
        queue[i + 1] = queue[i];
        i--;
    }
    queue[i + 1] = packet;
    count++;
    return 1;
}

int dequeue(Packet *result) {
    if (count == 0) return 0;
    *result = queue[0];
    for (int i = 1; i < count; i++) queue[i - 1] = queue[i];
    count--;
    return 1;
}

void display(void) {
    if (count == 0) puts("Queue empty.");
    for (int i = 0; i < count; i++)
        printf("ID %d | %s | P%d\n", queue[i].id,
               names[queue[i].mode], queue[i].priority);
}

int main(void) {
    int choice, mode;
    Packet sent;
    char line[80], extra;
    for (;;) {
        puts("\n1. Add  2. Transmit  3. Display  0. Exit");
        if (!fgets(line, sizeof(line), stdin)) break;
        if (sscanf(line, "%1d %c", &choice, &extra) != 1) {
            puts("Invalid choice.");
            continue;
        }
        if (choice == 0) break;
        switch (choice) {
            case 1:
                puts("1 TT&C | 2 SSTV | 3 Codec2 | 4 M17");
                if (!fgets(line, sizeof(line), stdin)) return 0;
                if (sscanf(line, "%1d %c", &mode, &extra) != 1 || !enqueue(mode))
                    puts("Invalid mode or queue full.");
                else puts("Packet added.");
                break;
            case 2:
                if (dequeue(&sent)) printf("Sent packet %d (%s).\n", sent.id, names[sent.mode]);
                else puts("Queue empty.");
                break;
            case 3: display(); break;
            default: puts("Invalid choice.");
        }
    }
    return 0;
}
