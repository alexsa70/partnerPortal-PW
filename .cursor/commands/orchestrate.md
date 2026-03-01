# orchestrate

**Use the subagent-orchestration skill** to run the full planner → worker → code reviewer flow for a large or multi-task development effort.

1. **Read and follow** the skill at `.cursor/skills/subagent-orchestration/SKILL.md`.
2. **Ask the user** (if not already provided): “What’s the large task or list of tasks you want to orchestrate?” Then use their answer as the input to the skill.
3. **Execute the skill**:
   - Run the **planner** subagent first to produce a plan and per-subtask files.
   - Discover subtasks from the plan and run them **in plan order**.
   - For each subtask: run **worker** (implement) → **code-reviewer** (review) → **worker** again if the reviewer found critical errors, flaws, or optimizations to apply.
4. Continue until all subtasks are done, then summarize what was delivered.

This command is available in chat as `/orchestrate`.
