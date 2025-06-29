using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class EighthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_OtherDishes_OtherDishesId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_PizzaPrices_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_OtherDishesId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "OtherDishesId",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "PizzaPricePizzaId",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "PizzaPricePizzaSize",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_DishesId",
                table: "CartItems",
                column: "DishesId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PizzaId_SelectedSize",
                table: "CartItems",
                columns: new[] { "PizzaId", "SelectedSize" });

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_OtherDishes_DishesId",
                table: "CartItems",
                column: "DishesId",
                principalTable: "OtherDishes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_PizzaPrices_PizzaId_SelectedSize",
                table: "CartItems",
                columns: new[] { "PizzaId", "SelectedSize" },
                principalTable: "PizzaPrices",
                principalColumns: new[] { "PizzaId", "PizzaSize" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_OtherDishes_DishesId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_PizzaPrices_PizzaId_SelectedSize",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_DishesId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PizzaId_SelectedSize",
                table: "CartItems");

            migrationBuilder.AddColumn<long>(
                name: "OtherDishesId",
                table: "CartItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PizzaPricePizzaId",
                table: "CartItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PizzaPricePizzaSize",
                table: "CartItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_OtherDishesId",
                table: "CartItems",
                column: "OtherDishesId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems",
                columns: new[] { "PizzaPricePizzaId", "PizzaPricePizzaSize" });

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_OtherDishes_OtherDishesId",
                table: "CartItems",
                column: "OtherDishesId",
                principalTable: "OtherDishes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_PizzaPrices_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems",
                columns: new[] { "PizzaPricePizzaId", "PizzaPricePizzaSize" },
                principalTable: "PizzaPrices",
                principalColumns: new[] { "PizzaId", "PizzaSize" });
        }
    }
}
