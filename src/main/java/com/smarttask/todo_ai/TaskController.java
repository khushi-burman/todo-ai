package com.smarttask.todo_ai;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    // 1. UPDATE TASK STATUS (Toggle between completed and pending)
    @PutMapping("/{id}")
    public Task updateTaskStatus(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        // Toggle the completion status flip-flop style
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    // 2. DELETE TASK FROM DATABASE
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        taskRepository.delete(task);
        return "Task with ID " + id + " has been successfully deleted.";
    }

}