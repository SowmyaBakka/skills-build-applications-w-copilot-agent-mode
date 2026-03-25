from rest_framework import serializers

# Example serializer for ObjectId conversion
class ObjectIdSerializerField(serializers.Field):
    def to_representation(self, value):
        return str(value)
    def to_internal_value(self, data):
        return data
