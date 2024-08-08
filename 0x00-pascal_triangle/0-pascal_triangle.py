#!/usr/bin/python3

"""
Module to implement a pascal triangle
"""


def pascal_triangle(n):
    """
    Function to return a list of lists of integers representing the
    Pascal’s triangle of n

    Args:
        n (int): The number of rows to generate for Pascal's Triangle

    Returns:
        List[List[int]]: List of lists representing Pascal’s Triangle
    """
    if n <= 0:
        return []
    pa_triangle = [[1]]
    for a in range(1, n):
        row = [1]
        for b in range(1, a):
            row.append(pa_triangle[a - 1][b - 1] + pa_triangle[a - 1][b])
        row.append(1)
        pa_triangle.append(row)

    return pa_triangle
