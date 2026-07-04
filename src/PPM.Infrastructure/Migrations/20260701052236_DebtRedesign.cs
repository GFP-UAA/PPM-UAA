using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PPM.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DebtRedesign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "Debts");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Debts",
                newName: "EntityName");

            migrationBuilder.AlterColumn<int>(
                name: "TermMonths",
                table: "Debts",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "CurrentInstallment",
                table: "Debts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "InstallmentAmount",
                table: "Debts",
                type: "TEXT",
                precision: 18,
                scale: 0,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsOpenEnded",
                table: "Debts",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ProductOrService",
                table: "Debts",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentInstallment",
                table: "Debts");

            migrationBuilder.DropColumn(
                name: "InstallmentAmount",
                table: "Debts");

            migrationBuilder.DropColumn(
                name: "IsOpenEnded",
                table: "Debts");

            migrationBuilder.DropColumn(
                name: "ProductOrService",
                table: "Debts");

            migrationBuilder.RenameColumn(
                name: "EntityName",
                table: "Debts",
                newName: "Name");

            migrationBuilder.AlterColumn<int>(
                name: "TermMonths",
                table: "Debts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "Debts",
                type: "TEXT",
                precision: 18,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
