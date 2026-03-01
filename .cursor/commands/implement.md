# Implement (Subagent Workflow)

Run the **Subagent Workflow** from the `subagent-workflow` skill: Worker → Code reviewer → Worker (when needed).

## What to do

1. **Worker (implementation)**  
   Launch the **worker** subagent (`subagent_type: "worker"`) with a clear task description.  
   Use as the task the text the user wrote after `/implement`, or ask the user to clarify the task.  
   Wait for the worker to complete.

2. **Code reviewer (review)**  
   After the worker finishes, launch the **code-reviewer** subagent (`subagent_type: "code-reviewer"`).  
   Pass context: what was done, which files or areas of the codebase were touched. The reviewer will look at changes (e.g. via git diff).

3. **Review results**  
   The reviewer must explicitly describe:
   - Critical errors (bugs, incorrect behavior);
   - Flaws (security, maintainability, correctness);
   - Optimization opportunities (performance, clarity, structure).  
   If there are no critical issues or meaningful optimizations, the process can end after this step.

4. **Worker (fixes from review)**  
   If the reviewer reported **critical errors**, **flaws**, or **optimizations** that should be applied:
   - Launch **worker** again with a task to implement **all** of the reviewer’s suggestions (list or briefly describe them in the task).  
   After the worker completes, you may optionally run the code reviewer again to verify; otherwise consider the workflow complete.

## Order

- Always **worker** first, then **reviewer**. For a new task, do not run the reviewer before the worker.
- The second worker run is only when the reviewer has concrete, actionable findings to implement.

Write task descriptions for subagents clearly and self-contained so they can run without re-reading the full chat.
