using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SixthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Pizza_PizzaId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PizzaId",
                table: "CartItems");

            migrationBuilder.AddColumn<int>(
                name: "SelectedSize",
                table: "CartItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PizzaId_SelectedSize",
                table: "CartItems",
                columns: new[] { "PizzaId", "SelectedSize" });

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
                name: "FK_CartItems_PizzaPrices_PizzaId_SelectedSize",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PizzaId_SelectedSize",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "SelectedSize",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PizzaId",
                table: "CartItems",
                column: "PizzaId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Pizza_PizzaId",
                table: "CartItems",
                column: "PizzaId",
                principalTable: "Pizza",
                principalColumn: "Id");
        }
    }
}
