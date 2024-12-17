# Task 09 - Server actions, Database

> IMPORTANT - This application is created using Next v15 and React 19. You **need** to install dependencies via `npm i --legacy-peer-deps`

This week, your task is to rework task number 6 to use Server actions instead of API endpoints and asynchronous React Server Components to retrieve data instead of useQuery. You are provided with a correct solution of task number 6. The final functionality required is exactly the same as in problem number 6, except:

- the logged-in user must be stored in the database, not just in the application Context. The user must remain logged in after reloading the entire application. To retrieve the logged in user, we recommend creating a custom asynchronous function that will read from the database which user is logged in.

  - there is no need to create a separate table for the logged-in user. The `isLoggedIn` flag in the `users` table is sufficient. Suppose that only one user can be logged in at a time. There is no need to include this condition in the code, it is a general assumption.

- the application will allow users to log out.

## Requirements

- All functionality that is available in task 6 must be available in this task.

- The resulting application will not use any API endpoints, but only Server actions (for logging in, logging out, creating a new gift, and updating the gift delivery status) and asynchronous React Server Components (for retrieving data from the database).

  - The `src/app/api` folder should be completely deleted.

- The `src/modules/*/schema.ts` should be removed. All schemas should be replaced by schemas in the database.

- The `src/modules/*/server.ts` folder should be removed. Create a local sqlite database using Turso and use Drizzle ORM to mutate and query data.

- The `src/context` folder should be removed. The user should be stored in the database.

Tips:

- When implementing server actions and creating a database, read our materials.

- Use the local database with `turso` during development.

  - You need to create a `.env` file with two variables - `DATABASE_URL` and `AUTH_TOKEN`.

- Take inspiration from the code structure presented in the lecture.

- The database schema does not differ from the currently defined schemas in `src/modules/*/schema.ts`. The only change is the addition of the `isLoggedIn` column to the `users` table.

- There is a `users 1:M gifts` relationship between the two tables. In the `gifts` table, there is a column `createdBy` which refers to the `id` of the user who created the gift. To create a relationship, use the `relations` function from the `drizzle-orm`.

  - Be sure to include this session in the schema in your database instance

  ```ts
  const db = drizzle(client, {
  	schema: {
  		users,
  		gifts,

  		// relations
  		usersRelations,
  		giftsRelations
  	}
  });
  ```

- To create a user `role` in the database so that the value can only contain "user" or "santa", we can add additional `options` to the `text` function, specifically as follows:

```ts

const roleSchema = z.enum(['santa', 'user']);

const users = sqliteTable('users', {
  ...

  role: text('role', { enum: roleSchema.options }),
})
```

## Maximum points: 40

## Video

[Click to see the video](https://drive.google.com/file/d/1NbQX7elX6j_PaojDkCC8DBU0-caG882R/view?usp=sharing)
