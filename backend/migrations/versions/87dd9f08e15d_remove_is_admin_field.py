"""remove is_admin field

Revision ID: 87dd9f08e15d
Revises: 4996a6b8f2b2
Create Date: 2024-11-17 05:37:35.995117

"""
import sqlmodel

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '87dd9f08e15d'
down_revision: Union[str, None] = '4996a6b8f2b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_user_email', table_name='user')
    op.drop_table('user')
    op.drop_table('driverlicenseapplication')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('driverlicenseapplication',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('last_name', sa.VARCHAR(), nullable=False),
    sa.Column('first_name', sa.VARCHAR(), nullable=False),
    sa.Column('middle_name', sa.VARCHAR(), nullable=True),
    sa.Column('driver_license_number', sa.VARCHAR(), nullable=True),
    sa.Column('birth_date', sa.VARCHAR(), nullable=False),
    sa.Column('sex', sa.VARCHAR(), nullable=False),
    sa.Column('height', sa.FLOAT(), nullable=False),
    sa.Column('unit_number', sa.VARCHAR(), nullable=True),
    sa.Column('street_number', sa.VARCHAR(), nullable=False),
    sa.Column('street_name', sa.VARCHAR(), nullable=False),
    sa.Column('po_box', sa.VARCHAR(), nullable=True),
    sa.Column('city', sa.VARCHAR(), nullable=False),
    sa.Column('province', sa.VARCHAR(), nullable=False),
    sa.Column('postal_code', sa.VARCHAR(), nullable=False),
    sa.Column('status', sa.VARCHAR(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('password', sa.VARCHAR(), nullable=False),
    sa.Column('email', sa.VARCHAR(length=255), nullable=False),
    sa.Column('is_admin', sa.BOOLEAN(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_user_email', 'user', ['email'], unique=1)
    # ### end Alembic commands ###