using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SeventhMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "OrderId",
                table: "CartItems",
                type: "bigint",
                nullable: true);

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

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Orderer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderState = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DeliveryManId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Users_DeliveryManId",
                        column: x => x.DeliveryManId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_OrderId",
                table: "CartItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_OtherDishesId",
                table: "CartItems",
                column: "OtherDishesId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems",
                columns: new[] { "PizzaPricePizzaId", "PizzaPricePizzaSize" });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryManId",
                table: "Orders",
                column: "DeliveryManId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Orders_OrderId",
                table: "CartItems",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Orders_OrderId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_OtherDishes_OtherDishesId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_PizzaPrices_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_OrderId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_OtherDishesId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PizzaPricePizzaId_PizzaPricePizzaSize",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "OrderId",
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
    }
}
